export async function checkOrganisationExists(orgName) {
    try {
        const response = await fetch(`https://hierarkey.onrender.com/organisations/exists?name=${encodeURIComponent(orgName)}`);
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
        const response = await fetch(`https://hierarkey.onrender.com/employees/email_exists?new_email=${encodeURIComponent(email)}`);
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
        const response = await fetch(`https://hierarkey.onrender.com/organisations/get`);
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
        const response = await fetch(`https://hierarkey.onrender.com/employees/empl_exists?email=${encodeURIComponent(email)}&org_name=${encodeURIComponent(orgName)}`);
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

export async function hash(input) {
    const saltedInput = '3UT@2025' + input;

    const encoded = new TextEncoder().encode(saltedInput);

    const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);

    const hashHex = Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

    return hashHex;
}

export async function login(email, password) {
    try {
        const response = await fetch(`https://hierarkey.onrender.com/employees/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const result = await response.json();

        if (response.ok) {
            sessionStorage.setItem('email', email);
            const access = await hash(email); 
            sessionStorage.setItem('access', access);
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

export async function getNumEmployees(email) {
    try {
        const response = await fetch(`https://hierarkey.onrender.com/employees/num_empl?email=${encodeURIComponent(email)}`);
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

export async function getNumManagers(email) {
    try {
        const response = await fetch(`https://hierarkey.onrender.com/employees/num_managers?email=${encodeURIComponent(email)}`);
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

export async function getNumEditors(email) {
    try {
        const response = await fetch(`https://hierarkey.onrender.com/employees/num_editors?email=${encodeURIComponent(email)}`);
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

export async function getEmplOverview(email) {
    try {
        const response = await fetch(`https://hierarkey.onrender.com/employees/emp_overview?email=${encodeURIComponent(email)}`);
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

export async function getEmplDetails(email) {
    try {
        const response = await fetch(`https://hierarkey.onrender.com/employees/emp_details?email=${encodeURIComponent(email)}`);
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

export async function getOrgID(email) {
    try {
        const response = await fetch(`https://hierarkey.onrender.com/employees/get_org_id?email=${encodeURIComponent(email)}`);
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

export async function getOrgAccess(org_id) {
    try {
        const response = await fetch(`https://hierarkey.onrender.com/organisations/org_access?id=${encodeURIComponent(org_id)}`);
        const result = await response.json();

        // console.log(result); 
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

export async function isEditor(email) {
    try {
        const response = await fetch(`https://hierarkey.onrender.com/employees/is_editor?email=${encodeURIComponent(email)}`);
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

export async function getUserDetails(email) {
    try {
        const response = await fetch(`http://localhost:3001/employees/user_details?email=${encodeURIComponent(email)}`);
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