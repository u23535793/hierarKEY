export default function BuildTree(employeeList, type) {

    function buildTree(managerEmail) {
        const subordinates = employeeList.filter(emp => emp.manager === managerEmail);

        return subordinates.map(emp => {
            const children = buildTree(emp.email);
            let node; 
            if (type === 'position') {
                node = {
                    name: emp.position
                };
            }
            else {
                node = {
                    name: `${emp.name} ${emp.surname}`.trim()
                };
            }

            if (children.length > 0) {
                node.children = children;
            }

            return node;
        });
    }

    const tree = {
        name: 'Organization',
        children: buildTree(null) 
    };

    return tree;
}