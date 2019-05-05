import React, {useContext, useEffect} from 'react';
import './Chart.scss';
import {Line as LineChart} from 'react-chartjs-2';
import {Context} from '../../App';
import {fetchParticipation} from '../../api';
import {createNumberSequenceArray} from '../../common/utils';

const Chart = () => {
    const {state: {chart, list: {clicked: repository}}, dispatch} = useContext(Context);

    const loadChartData = () => {
        fetchParticipation(repository.apiUrl)
            .then(data => {
                const issues = repository.issues === 0 ? 1 : repository.issues;

                const chartData = {
                    labels: createNumberSequenceArray(data.all.length, 1),
                    datasets: [
                        {
                            label: 'Effective hours spent',
                            data: data.all.map(data => repository.contributors * data / issues)
                        }
                    ]
                };

                dispatch({type: 'SET_CHART_DATA', data: chartData});
            })
    };

    useEffect(loadChartData, [repository]);

    return (
        <div className="Chart">
            <div className="Title">Effective hours spend per year</div>
            {chart.data && <LineChart data={chart.data}/>}
        </div>
    );
};

export default Chart;
