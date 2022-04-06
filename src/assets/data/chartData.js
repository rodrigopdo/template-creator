import colors from '../../styles/colors';
import { cpfMask } from '../../utils/cpfMask';
import moment from 'moment';

export const chartOptions = {
  series: [{
    name: 'Total de limite concedido',
    data: [404.000, 700.789, 500.456, 690.789, 436.345, 980.78, 300.567, 991.788, 600.67, 990.678, 999.567, 999.456]
  }, {
    name: 'Total Carteira em Aberto',
    data: [1604.000, 600.789, 800.456, 1290.789, 1436.345, 1180.78, 100.567, 1591.788, 1600.67, 1090.678, 1699.567, 899.456]
  },
  {
    name: 'Total Carteira em Aberto',
    data: [1604.000, 600.789, 800.456, 1290.789, 1436.345, 1180.78, 100.567, 1591.788, 1600.67, 1090.678, 1699.567, 899.456]
  }
  ],

  options: {
    colors: ['rgba(140, 226, 105, 0.7)', '#49C776', 'rgba(0, 144, 69, 0.6)'],

    chart: {
      background: 'transparent',
      padding: '30px',
      fontFamily: 'Montserrat, Arial, sans-serif',
      foreColor: colors.gray4
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    },
    legend: {
      position: 'bottom',
      itemMargin: {
        horizontal: 5,
        vertical: 0
      },
    },
    grid: {
      show: false
    },
  },
}


// ==========================================


export const topCustomers = {
  head: [
    'Nome Produtor',
    'CPF',
    'Valor contratado'
  ],
  body: [
    {
      "username": "john doe",
      "order": "490.456.678-87",
      "price": "R$ 55.000"
    },
    {
      "username": "frank iva",
      "order": "490.456.678-8",
      "price": "R$ 135.300"
    },
    {
      "username": "anthony baker",
      "order": "490.456.678-8",
      "price": "R$ 89.000"
    },
    {
      "username": "frank iva",
      "order": "490.456.678-8",
      "price": "R$ 320.000"
    },
    {
      "username": "anthony baker",
      "order": "490.456.678-8",
      "price": "R$ 56.890"
    }
  ]
}

export const renderCustomerHead = (item, index) => (
  <th key={index}>{item}</th>
)

export const renderCustomerBody = (value, index) => (
  <tr key={index}>
    <td>{value.name}</td>
    <td>{cpfMask(value.cpfOrCnpj)}</td>
    <td>{moment(value.cadastroContrato, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
    <td>{moment(value.vencimentoContrato, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
    <td>{value.valorLiberado != null ? value.valorLiberado.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 0}</td>
    <td>{value.saldoAtual != null ? value.saldoAtual.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 0}</td>
    <td>{value.proximaParcelaValor != null ? value.proximaParcelaValor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 0}</td>
    <td>{value.taxaJuros}%</td>
    <td>{value.productName}</td>
  </tr>
);

