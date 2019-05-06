import React, {useContext, useEffect} from 'react';
import './Chart.scss';
import {Line as LineChart} from 'react-chartjs-2';
import {Context} from '../../App';
import {fetchParticipation} from '../../api';
import {createNumberSequenceArray} from '../../common/utils';
import {CHART_OPTIONS} from '../../common/constants';
import Loader from '../loader/Loader';
import Error from '../error/Error';

const Chart = () => {
    const {state: {chart, list: {clicked: repository}}, dispatch} = useContext(Context);

    const loadChartData = () => {
        dispatch({type: 'SET_CHART_LOADING'});

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
            .catch(error => dispatch({type: 'SET_CHART_ERROR', error: error.message}));

        return () => dispatch({type: 'CLEAR_CHART_DATA'});
    };

    useEffect(loadChartData, [repository]);

    return (
        <div className="Chart">
            <div className="Title">Effective hours spend per year</div>
            {chart.error && <Error error={chart.error} retry={loadChartData}/>}
            {chart.loading ? <Loader/> : chart.data && <LineChart data={chart.data} options={CHART_OPTIONS}/>}
        </div>
    );
};

export default Chart;
