/**
 * Contact Form Service
 * Handles sending contact form data to the backend email service
 */

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:5000';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Send contact form data to the backend
 * @param data - Contact form data containing name, email, subject, and message
 * @returns Promise with the server response
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<ContactFormResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit contact form');
    }

    return result;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred';
    return {
      success: false,
      message: 'Failed to submit contact form',
      error: errorMessage,
    };
  }
}

/**
 * Check if the backend is running
 * @returns Promise indicating if the backend is available
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
}
