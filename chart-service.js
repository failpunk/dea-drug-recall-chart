export const chartService = () => {
    let currentChart;

    // TODO: NEED TO MAKE MULTIPLE CALLS TO GET ALL DATA.
    // TODO: DATA SHOULD BE LAST 12 MONTHS.

    async function fetchData(state) {
        let url = `https://api.fda.gov/drug/enforcement.json?search=report_date:[20180101+TO+20191231]+AND+state:${state}&limit=100`;

        let response = await window.fetch(url);
        return response.json();
    }

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

    return {
        async render(state) {
            try {
                let data = await fetchData(state);
                let formattedData = formatData(data.results);

                drawChart(formattedData, this.chartLabels);
            } catch (error) {
                console.log('ERROR Loading Data!', data);
            }
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
