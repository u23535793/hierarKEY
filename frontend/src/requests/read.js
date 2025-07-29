export async function checkOrganisationExists(orgName) {
    try {
        const response = await fetch(`http://localhost:3001/organisations/exists?name=${encodeURIComponent(orgName)}`);
        const result = await response.json();

        console.log(result); 
        if (response.ok) {
            return result.exists;  
        } else {
            console.error('Server error:', result.error);
            return null;
        }
    } 
    catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

export async function checkEmailExists(email) {
    try {
        const response = await fetch(`http://localhost:3001/employees?new_email=${encodeURIComponent(email)}`);
        const result = await response.json();

        if (response.ok) {
            return result.exists;
        } 
        else {
            console.error('Server error:', result.error);
            return null;
        }
    } 
    catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}