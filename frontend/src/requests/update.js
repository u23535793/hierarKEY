export async function updateUserDetails(userData) {
  try {
    const response = await fetch('http://localhost:3001/update_user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (response.ok) {
      return result;  // e.g. { success: true, data: ... }
    } else {
      console.error('Server error:', result.error);
      return null;
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}