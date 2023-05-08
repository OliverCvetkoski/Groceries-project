class GroceriesClient {
    constructor(url) {
        this.url = url;
    }

    async getGroceries() {
        const response = await fetch(this.url);
        if (!response.ok) {
            throw new Error(`Failed to retrieve data from API: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
}

const groceriesClient = new GroceriesClient('https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1');
groceriesClient.getGroceries()
    .then(data => {
        const domesticItems = [];
        const importedItems = [];

        data.forEach(item => {

            let { domestic, weight, description, ...props } = item;

            if (!weight) {
                weight = 'N/A'
            }
            if (domestic) {
                domesticItems.push({ ...props, weight, description: description.slice(0, 10) + '...' })
            } else {
                importedItems.push({ ...props, weight, description: description.slice(0, 10) + '...' })
            }
        });

        domesticItems.sort((a, b) => a.name.localeCompare(b.name));
        importedItems.sort((a, b) => a.name.localeCompare(b.name));

        const domesticCost = domesticItems.reduce((acc, item) => acc + item.price, 0);
        const importedCost = importedItems.reduce((acc, item) => acc + item.price, 0);

        console.log('Domestic :', domesticItems);
        console.log('Imported :', importedItems);
        console.log(`Domestic cost: $${domesticCost.toFixed(2)}`);
        console.log(`Imported cost: $${importedCost.toFixed(2)}`);
        console.log('Domestic count:', (domesticItems.length));
        console.log('Imported count:', (importedItems.length));

    })
    .catch(error => {
        console.error(error);
    });

