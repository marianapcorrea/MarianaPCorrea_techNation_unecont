import Chart from 'chart.js/auto'
import { INADIMPLENCE_EVOLUTION, INCOME_EVOLUTION, MONTHS } from './utils';

(async function() {
  
  const chart_nonPayment = {
    labels: MONTHS,
    datasets: [{
      label: 'Evolução da inadimplência',
      data:INADIMPLENCE_EVOLUTION,
      fill: false,
      borderColor: "#F3316F",
      tension: 0.1
    }]
  };

  const chart_incomeEvolution = {
    labels: MONTHS,
    datasets: [{
      label: 'Evolução da receita recebida',
      data: INCOME_EVOLUTION,
      fill: false,
      borderColor: "#F3316F",
      tension: 0.1
    }]
  };


  new Chart(
    document.getElementById('chart_nonPayment'), {
      type: 'line',
      data: chart_nonPayment,
    }
  );

  new Chart(
    document.getElementById('chart_incomeEvolution'), {
      type: 'line',
      data: chart_incomeEvolution,
    }
  );
  
})();