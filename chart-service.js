export function chartService() {
    return {
        fetchData(state) {
            let url = 'https://api.fda.gov/drug/enforcement.json?search=report_date:[20180101+TO+20191231]&count=state';

            try {
                let response = await window.fetch(url);
                let formattedData = await response.json();
                console.log('----', formattedData.results);
            } catch (error) {
                console.log('ERROR Loading Data!', data);    
            }
        },

        formatData(data) {
            // maybe aggregate records by month by parsing report_date and grouping by month
        },

        renderChart() {

        },

        get chartLabels() {
            ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        get chartStates() {
            ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    }
}
