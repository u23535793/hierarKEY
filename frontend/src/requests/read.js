export async function checkOrganisationExists(orgName) {
    try {
        const response = await fetch(`http://localhost:3001/organisations/exists?name=${encodeURIComponent(orgName)}`);
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

export async function checkEmailExists(email) {
    try {
        const response = await fetch(`http://localhost:3001/employees/email_exists?new_email=${encodeURIComponent(email)}`);
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

export async function getAllOrganisations() {
    try {
        const response = await fetch(`http://localhost:3001/organisations/get`);
        const result = await response.json();

        if (response.ok) {
            return result;  
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

export async function checkEmployExistsInOrg(email, orgName) {
    try {
        const response = await fetch(`http://localhost:3001/employees/empl_exists?email=${encodeURIComponent(email)}&org_name=${encodeURIComponent(orgName)}`);
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

export async function login(email, password) {
    try {
        const response = await fetch(`http://localhost:3001/employees/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
        const result = await response.json();

        if (response.ok) {
            return result; 
        } else {
            console.error('Server error:', result.error);
            return null;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}