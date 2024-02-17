import Chart from 'chart.js/auto'
import { MONTHS, NUMBER_MONTH_OBJ } from './auxiliarData';
import { getData } from './fetchJson';
import { filterByPastDue, filterByPayed } from '../utils';


(async function() {
  //fetch de dados de notas fiscais (json)
  const { invoices } = await getData();

  const objNonPayment = {};
  const objIncomeEvolution = {};

  // Inicializar valores dos meses para 0
  Object.values(NUMBER_MONTH_OBJ).forEach((month) => {
    objNonPayment[month] = 0;
    objIncomeEvolution[month] = 0;
  });

  // Iterar uma vez sobre as faturas
  invoices.forEach((fatura) => {
    const emissionDate = fatura.emissionDate;
    const invoiceValue = fatura.invoiceValue;
    const month = NUMBER_MONTH_OBJ[emissionDate.split('/')[1]];

    // Atualizar ambos objetos na mesma iteração
    objNonPayment[month] += fatura.invoiceStatus === 'Pagamento em atraso' ? invoiceValue : 0;
    objIncomeEvolution[month] += invoiceValue;
  });



  const chart_nonPayment = {
    labels: MONTHS,
    datasets: [{
      label: 'Evolução da inadimplência',
      data: objNonPayment,
      fill: false,
      backgroundColor: "#F3316F",
      tension: 0.1
    }]
  };

  const chart_incomeEvolution = {
    labels: MONTHS,
    datasets: [{
      label: 'Evolução da receita recebida',
      data: objIncomeEvolution,
      fill: false,
      backgroundColor: "#F3316F",
      tension: 0.1
    }]
  };


  new Chart(
    document.getElementById('chart_nonPayment'), {
      type: 'bar',
      data: chart_nonPayment,
    }
  );

  new Chart(
    document.getElementById('chart_incomeEvolution'), {
      type: 'bar',
      data: chart_incomeEvolution,
    }
  );
  
})();