/**
 * Generates a URL-encoded WhatsApp deep-link for package inquiries.
 * 
 * @param tierName Name of the selected package tier
 * @param price Price formulation detail of the package
 * @param userName Optional buyer name for personalization
 * @param phoneNumber Target WhatsApp number (Georgian format default)
 * @returns Fully qualified WhatsApp deep-link URL string
 */
export function generateWhatsAppLink(
  tierName: string,
  price: string,
  userName?: string,
  phoneNumber: string = "995555555555" // Placeholder default
): string {
  
  let message = `I’m ready to set a new track. Let’s move my operation to its permanent home on the internet with the *${tierName}* infrastructure.`;

  if (userName) {
    message += `\n\nName: ${userName}`;
  }
  
  if (price) {
    message += `\nInvestment: ${price}`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}
