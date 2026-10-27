"""
Blender test scene for the Genezisi scroll-scrub layer.

Renders a PNG frame sequence directly (no video intermediate), so the frames
are the master asset. The mp4, if wanted, is derived from these frames.

Aesthetic target: the same "one routed signal travelling a dark system" idea
as the 2D canvas source, but with real 3D depth — volumetric mist, a moving
camera, depth of field, a real specular ground. What a 2D canvas cannot do.

Run:
    blender -b --factory-startup --python scrub-blender.py -- \
        --frames 24 --out /path/frames --samples 64 --width 960 --height 540
"""

import math
import os
import sys

import bpy
import bmesh

# ---------------------------------------------------------------- args

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []


def arg(name, default):
    if name in argv:
        return argv[argv.index(name) + 1]
    return default


FRAMES = int(arg("--frames", 24))
OUT = arg("--out", "/tmp/frames")
SAMPLES = int(arg("--samples", 64))
W = int(arg("--width", 960))
H = int(arg("--height", 540))

os.makedirs(OUT, exist_ok=True)

# ---------------------------------------------------------------- setup

bpy.ops.wm.read_factory_settings(use_empty=True)

scene = bpy.context.scene
scene.render.engine = "CYCLES"
prefs = bpy.context.preferences.addons["cycles"].preferences
try:
    prefs.compute_device_type = "CUDA"
    prefs.get_devices()
    for d in prefs.devices:
        d.use = True
    scene.cycles.device = "GPU"
except Exception as e:  # CPU fallback
    print("GPU_SETUP_FAILED", e)
    scene.cycles.device = "CPU"

scene.cycles.samples = SAMPLES
scene.cycles.use_denoising = True
scene.cycles.max_bounces = 6
scene.cycles.transparent_max_bounces = 8
scene.render.resolution_x = W
scene.render.resolution_y = H
scene.render.resolution_percentage = 100
scene.render.film_transparent = False
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGB"
scene.render.image_settings.compression = 20
scene.view_settings.view_transform = "AgX"
scene.view_settings.look = "AgX - Medium High Contrast"

# ---------------------------------------------------------------- world

world = bpy.data.worlds.new("void")
scene.world = world
world.use_nodes = True
wnt = world.node_tree
wnt.nodes.clear()
bg = wnt.nodes.new("ShaderNodeBackground")
bg.inputs["Color"].default_value = (0.006, 0.016, 0.030, 1.0)
bg.inputs["Strength"].default_value = 1.0
wout = wnt.nodes.new("ShaderNodeOutputWorld")
wnt.links.new(bg.outputs["Background"], wout.inputs["Surface"])


def emissive(name, color, strength):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    nt.nodes.clear()
    e = nt.nodes.new("ShaderNodeEmission")
    e.inputs["Color"].default_value = (*color, 1.0)
    e.inputs["Strength"].default_value = strength
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    nt.links.new(e.outputs["Emission"], out.inputs["Surface"])
    return mat


def principled(name, base, rough=0.35, metallic=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*base, 1.0)
    bsdf.inputs["Roughness"].default_value = rough
    bsdf.inputs["Metallic"].default_value = metallic
    return mat


# ---------------------------------------------------------------- ground

bpy.ops.mesh.primitive_plane_add(size=60, location=(0, 0, 0))
ground = bpy.context.object
ground.name = "ground"
ground.data.materials.append(principled("ground_m", (0.010, 0.020, 0.032), rough=0.22, metallic=0.35))

# A faint blueprint grid, the identity carried over from the 2D source. It is
# geometry, not a texture, so it holds up under the moving camera.
grid_mat = emissive("grid_m", (0.09, 0.36, 0.48), 0.30)
for i in range(-14, 15):
    bpy.ops.mesh.primitive_plane_add(size=60, location=(0, i * 1.4, 0.004))
    ln = bpy.context.object
    ln.name = f"grid_h_{i}"
    ln.scale = (1.0, 0.0022, 1.0)
    ln.data.materials.append(grid_mat)
    bpy.ops.mesh.primitive_plane_add(size=60, location=(i * 1.4, 0, 0.004))
    ln = bpy.context.object
    ln.name = f"grid_v_{i}"
    ln.scale = (0.0022, 1.0, 1.0)
    ln.data.materials.append(grid_mat)

# ---------------------------------------------------------------- mist

bpy.ops.mesh.primitive_cube_add(size=40, location=(0, 0, 6))
mist = bpy.context.object
mist.name = "mist"
mist.display_type = "WIRE"
mist.visible_shadow = False
mist.visible_camera = False
mist_mat = bpy.data.materials.new("mist_m")
mist_mat.use_nodes = True
mnt = mist_mat.node_tree
mnt.nodes.clear()
vol = mnt.nodes.new("ShaderNodeVolumePrincipled")
vol.inputs["Color"].default_value = (0.10, 0.34, 0.46, 1.0)
vol.inputs["Density"].default_value = 0.035
vol.inputs["Anisotropy"].default_value = 0.35
mout = mnt.nodes.new("ShaderNodeOutputMaterial")
mnt.links.new(vol.outputs["Volume"], mout.inputs["Volume"])
mist.data.materials.append(mist_mat)

# ---------------------------------------------------------------- the route

# One polyline: five stations along a routed path. This is the "system"
# the signal travels — the same information architecture as the 2D source.
ROUTE = [
    (-7.0, -3.2, 0.0),
    (-7.0, 1.4, 0.0),
    (-2.4, 1.4, 0.0),
    (-2.4, -1.0, 0.0),
    (2.6, -1.0, 0.0),
    (2.6, 3.0, 0.0),
    (7.2, 3.0, 0.0),
]

curve_data = bpy.data.curves.new("route", "CURVE")
curve_data.dimensions = "3D"
spline = curve_data.splines.new("POLY")
spline.points.add(len(ROUTE) - 1)
for i, (x, y, z) in enumerate(ROUTE):
    spline.points[i].co = (x, y, z, 1.0)
route = bpy.data.objects.new("route", curve_data)
scene.collection.objects.link(route)
route.data.materials.append(emissive("route_m", (0.16, 0.72, 0.86), 9.0))
route.data.bevel_depth = 0.035
route.data.bevel_resolution = 4

# The travelled part: a second curve, trimmed by a bevel-factor animation.
lit_data = bpy.data.curves.new("route_lit", "CURVE")
lit_data.dimensions = "3D"
lit_spline = lit_data.splines.new("POLY")
lit_spline.points.add(len(ROUTE) - 1)
for i, (x, y, z) in enumerate(ROUTE):
    lit_spline.points[i].co = (x, y, z, 1.0)
lit = bpy.data.objects.new("route_lit", lit_data)
scene.collection.objects.link(lit)
lit.data.materials.append(emissive("route_lit_m", (0.55, 0.96, 1.0), 14.0))
lit.data.bevel_depth = 0.055
lit.data.bevel_resolution = 4
lit.data.bevel_factor_start = 0.0
lit.data.bevel_factor_end = 0.02
lit.data.bevel_factor_mapping_end = "SPLINE"

# ---------------------------------------------------------------- stations

STATIONS = [(0, 2), (2, 3), (4, 5), (6, 7), (6, 7)]
station_pts = [ROUTE[0], ROUTE[2], ROUTE[4], ROUTE[6], ROUTE[-1]]
station_splats = []
for i, p in enumerate(station_pts):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.17, location=p)
    node = bpy.context.object
    node.name = f"station_{i}"
    node.data.materials.append(emissive(f"station_m_{i}", (0.30, 0.85, 0.95), 7.0))
    station_splats.append(node)

# A soft ring at each station so they read as machined, not as dots.
for i, p in enumerate(station_pts):
    bpy.ops.mesh.primitive_torus_add(
        major_radius=0.34, minor_radius=0.018, location=p, rotation=(math.pi / 2, 0, 0)
    )
    ring = bpy.context.object
    ring.name = f"ring_{i}"
    ring.data.materials.append(emissive(f"ring_m_{i}", (0.18, 0.60, 0.72), 2.4))

# ---------------------------------------------------------------- the signal

bpy.ops.mesh.primitive_uv_sphere_add(radius=0.115, location=ROUTE[0])
signal = bpy.context.object
signal.name = "signal"
signal.data.materials.append(emissive("signal_m", (0.85, 0.99, 1.0), 95.0))

bpy.ops.mesh.primitive_uv_sphere_add(radius=0.42, location=ROUTE[0])
halo = bpy.context.object
halo.name = "halo"
halo.data.materials.append(emissive("halo_m", (0.25, 0.80, 0.95), 4.0))
halo.visible_shadow = False

# ---------------------------------------------------------------- lights

bpy.ops.object.light_add(type="AREA", location=(-6, -7, 7))
key = bpy.context.object
key.data.energy = 900
key.data.size = 7
key.data.color = (0.55, 0.78, 1.0)

bpy.ops.object.light_add(type="AREA", location=(7, 6, 5))
rim = bpy.context.object
rim.data.energy = 500
rim.data.size = 6
rim.data.color = (0.30, 0.90, 1.0)

bpy.ops.object.light_add(type="AREA", location=(0, 0, 9))
fill = bpy.context.object
fill.data.energy = 1400
fill.data.size = 12
fill.data.color = (0.62, 0.80, 1.0)
fill.data.shape = "DISK"

# ---------------------------------------------------------------- animation

frame_start = 1
frame_end = FRAMES
scene.frame_start = frame_start
scene.frame_end = frame_end


def route_point(t):
    """Position along the polyline at 0..1, with a smoothstep ease."""
    t = max(0.0, min(1.0, t))
    e = t * t * (3 - 2 * t)
    segs = len(ROUTE) - 1
    f = e * segs
    i = min(int(f), segs - 1)
    local = f - i
    a, b = ROUTE[i], ROUTE[i + 1]
    return tuple(a[k] + (b[k] - a[k]) * local for k in range(3))


for f in range(frame_start, frame_end + 1):
    t = (f - frame_start) / max(1, frame_end - frame_start)
    # The signal starts at 18% and arrives at 78% — the ends are calm.
    st = 0.18 + t * 0.60
    p = route_point(st)
    signal.location = p
    halo.location = p
    lit.data.bevel_factor_end = max(0.001, st)
    # Stations light as the signal reaches them.
    for i, node in enumerate(station_splats):
        reached = 1.0 if st >= (i / (len(station_splats) - 1)) * 0.98 else 0.0
        node.data.materials[0].node_tree.nodes["Emission"].inputs["Strength"].default_value = (
            11.0 + 16.0 * reached
        )
    signal.keyframe_insert("location", frame=f)
    halo.keyframe_insert("location", frame=f)
    lit.data.keyframe_insert("bevel_factor_end", frame=f)

# Camera: a slow arc that tracks the signal, so the frame has parallax.
cam_data = bpy.data.cameras.new("cam")
cam_data.lens = 42
cam_data.dof.use_dof = True
cam_data.dof.aperture_fstop = 1.6
cam = bpy.data.objects.new("cam", cam_data)
scene.collection.objects.link(cam)
scene.camera = cam

# One focus object, moved each frame. `dof.focus_object` itself is not
# animatable in Blender 4.2, so the target is animated instead.
focus = bpy.data.objects.new("focus", None)
scene.collection.objects.link(focus)
cam_data.dof.focus_object = focus

# A Blender camera points down its own -Z with no auto-aim: without this
# constraint it stares at the floor and the whole render comes out black.
track = cam.constraints.new("TRACK_TO")
track.target = focus
track.track_axis = "TRACK_NEGATIVE_Z"
track.up_axis = "UP_Y"

for f in range(frame_start, frame_end + 1):
    t = (f - frame_start) / max(1, frame_end - frame_start)
    p = route_point(0.18 + t * 0.60)
    ang = -0.9 + t * 1.25
    dist = 7.6 - t * 1.8
    cam.location = (
        p[0] * 0.55 + math.cos(ang) * dist,
        p[1] * 0.55 + math.sin(ang) * dist,
        2.9 - t * 0.7,
    )
    focus.location = p
    cam.keyframe_insert("location", frame=f)
    focus.keyframe_insert("location", frame=f)

# ---------------------------------------------------------------- render

scene.render.filepath = os.path.join(OUT, "f")
bpy.ops.render.render(animation=True)
print("RENDER_DONE", OUT)
