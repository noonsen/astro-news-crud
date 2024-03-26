```
## Fetch using 1 ID
fetch('http://localhost:4321/api/data.json') // Replace 'http://localhost:4321/api/data.json' with the actual endpoint URL
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(apiData => {
    // Process the fetched data here
    console.log('Data from API endpoint:', apiData);
    if (apiData && apiData.length > 0) {
      const idToFetch = apiData[0].id; // Assuming you want to fetch the ID of the first item
      fetchSingleID(idToFetch);
    } else {
      console.error('No data available');
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

async function fetchSingleID(id) {
  try {
    // Import data for a single ID from the API endpoint
    const response = await fetch(`http://localhost:4321/api/data.json?id=${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const singleData = await response.json();
    
    // Process the fetched single data here
    console.log('Single data for ID:', singleData);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

```


## FETCH ALL ID


```
fetch('http://localhost:4321/api/data.json') // Replace 'http://localhost:4321/api/data.json' with the actual endpoint URL
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(apiData => {
    // Process the fetched data here
    console.log('Data from API endpoint:', apiData);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

(async () => {
  try {
    // Import data from the local JSON file
    const response = await fetch('http://localhost:4321/api/data.json'); // Replace './api/data.json' with the correct path to your JSON file
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const localData = await response.json();
    
    // Process the fetched data here
    console.log('Data from local JSON file:', localData);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
})();


```
