import { hash, getOrgID, getOrgAccess } from './read'

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

export async function addEmployee(currEmail, emp_num, dob, email, name, surname, position, salary, manager, editor) {
    const org_id = await getOrgID(currEmail); 
    // console.log(org_id); 
    const access = await getOrgAccess(org_id); 
    // console.log(access); 

    const empNumValue = emp_num && emp_num.trim() !== '' ? emp_num : null;
    const dobValue = dob && dob.trim() !== '' ? dob : null;
    const positionValue = position && position.trim() !== '' ? position : null;
    const salaryValue = salary && salary !== '' ? parseFloat(salary) : null;
    const managerValue = manager && manager.trim() !== '' ? manager : null;

    try {
        const response = await fetch('http://localhost:3001/employees/new_empl', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emp_num: empNumValue, dob: dobValue, email, password: access, name, surname, org_id, position: positionValue, salary: salaryValue, manager: managerValue, editor })
        });

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