import Chart from 'chart.js/auto'

(async function() {
  const labels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  const chart_nonPayment = {
    labels: labels,
    datasets: [{
      label: 'Evolução da inadimplência',
      data: [65, 59, 80, 81, 56, 55, 40, 81, 56, 55, 40,50],
      fill: false,
      borderColor: "#e80c6b",
      tension: 0.1
    }]
  };

  const chart_incomeEvolution = {
    labels: labels,
    datasets: [{
      label: 'Evolução da receita recebida',
      data: [165, 519, 480, 851, 506, 575, 490, 801, 556, 535, 490,500],
      fill: false,
      borderColor: "#e80c6b",
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