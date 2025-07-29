export async function insertOrganisation(orgName) {
    try {
        const response = await fetch('http://localhost:3001/organisations/insert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ org_name: orgName })
        });

        const result = await response.json();

        if (response.ok) {
            return result.id;
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

export async function signUp(orgName, name, surname, email, password) {
    let org_id; 

    try {
        const response = await fetch('http://localhost:3001/organisations/insert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ org_name: orgName })
        });

        const result = await response.json();

        if (response.ok) {
            org_id = result.id;
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

    try {
        const response = await fetch('http://localhost:3001/employees/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name, surname, org_id })
        });

        const result = await response.json();
        console.log(result); 

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