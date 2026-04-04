import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic parameters for the 'Elite' brand card
    const name = searchParams.get('name') || 'Your Name';
    const title = searchParams.get('title') || 'Professional Title';
    const accent = searchParams.get('accent') || '#1A2744';
    const photo = searchParams.get('photo');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0F172A', // Deep Navy base
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Branded background gradient */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              left: '-10%',
              width: '140%',
              height: '140%',
              display: 'flex',
              background: `radial-gradient(circle at 10% 10%, ${accent} 0%, transparent 45%), radial-gradient(circle at 90% 90%, ${accent} 0%, transparent 45%)`,
              opacity: 0.25,
            }}
          />

          {/* Fine-grain noise overlay (simulated) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              opacity: 0.03,
              background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
            }}
          />

          {/* Content Container */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 60,
              zIndex: 10,
              padding: '0 80px',
            }}
          >
            {/* Profile Photo (if provided) */}
            {photo ? (
              <div
                style={{
                  display: 'flex',
                  width: 280,
                  height: 280,
                  borderRadius: 140,
                  overflow: 'hidden',
                  border: `8px solid ${accent}`,
                  backgroundColor: '#ffffff',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo}
                  alt={name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ) : null}

            {/* Text Details */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: photo ? 'left' : 'center',
              }}
            >
              <h1
                style={{
                  fontSize: 84,
                  fontWeight: 900,
                  color: '#ffffff',
                  marginBottom: 10,
                  letterSpacing: '-2px',
                  fontFamily: 'sans-serif',
                }}
              >
                {name}
              </h1>
              <p
                style={{
                  fontSize: 38,
                  fontWeight: 500,
                  color: '#94A3B8',
                  marginBottom: 0,
                  fontFamily: 'sans-serif',
                }}
              >
                {title}
              </p>
              
              {/* Branding Tag */}
              <div
                style={{
                  display: 'flex',
                  marginTop: 40,
                  padding: '12px 24px',
                  borderRadius: 12,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  alignItems: 'center',
                  alignSelf: photo ? 'flex-start' : 'center',
                }}
              >
                <span
                   style={{
                     fontSize: 18,
                     fontWeight: 700,
                     letterSpacing: '2px',
                     color: accent,
                     textTransform: 'uppercase',
                   }}
                >
                   Genezisi Digital House
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
