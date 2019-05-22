export const chartService = () => {
    let currentChart;
    let apiResults = [];
    let resultSet = [];

    // TODO: DATA SHOULD BE LAST 12 MONTHS.

    async function fetchData(state) {
        let data = [];
        let skip = 0;
        let total = Number.POSITIVE_INFINITY;

        // keep callingn API until results run out.
        while (skip <= total) {
            let { meta, results } = await fetchResultBatch(state, skip);

            // recalc the current page number.
            skip += meta.results.limit;
            total = meta.results.total;

            // add batch to the total data.
            data = data.concat(results);
        }

        return data;
    }

    // Fetches a single batch of results from the API (maximum 100)
    async function fetchResultBatch(state, skip, limit = 100) {
        let url = `https://api.fda.gov/drug/enforcement.json?search=report_date:[20180101+TO+20191231]+AND+state:${state}&limit=${limit}&skip=${skip}`;

        let response = await window.fetch(url);
        return response.json();
    }

    // Aggregate by month and format raw API data to be used with our charting software.
    function formatData(data) {
        let monthData = {};

        data.forEach(item => {
            let month = item.report_date.substring(4, 6);

            if (monthData[month] === undefined) {
                monthData[month] = 0;
            }

            monthData[month]++;
        });

        return Object.keys(monthData).map(key => monthData[key]);
    }

    // Instantiates a new chart with our updated dataset.
    function drawChart(data, labels) {
        currentChart = new Chartist.Bar(
            '.chart',
            {
                labels: labels,
                series: data,
            },
            {
                distributeSeries: true,
            }
        );
    }

    /**
     * Public methods
     */
    return {
        // Render a chart for a given state code.
        async render(state) {
            try {
                apiResults = await fetchData(state);
                resultSet = formatData(apiResults);

                drawChart(resultSet, this.chartLabels);

                return true;
            } catch (error) {
                console.log('ERROR Loading Data!', error);
            }
        },

        get resultSet() {
            return resultSet;
        },

        get apiResults() {
            return apiResults;
        },

        get chartLabels() {
            return [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ];
        },
    };
};
