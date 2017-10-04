angular.module('krhatos', [])
    .controller('DashboardController', function($scope) {
        var vm = this;

        vm.title = 'Dashboard Raquel Xavier';

        //// dados
        vm.dados = [{
            "nome": "deRose",
            "unidades": 18,
            "procura": 1000000,
            "preco": 479,
            "site": "https://www.metododerose.org/"
        }, {
            "nome": "Centro de Meditação Kadampa",
            "unidades": 8,
            "procura": 768160,
            "preco": 100,
            "site": "http://www.meditadoresurbanos.org.br/"
        }, {
            "nome": "Sri Chinmay",
            "unidades": 5,
            "procura": 17300,
            "preco": 0,
            "site": "http://www.meditacaosp.com/sobre-sri-chinmoy/"
        }, {
            "nome": "Instituto Nacional de Meditacao",
            "unidades": 1,
            "procura": 125000,
            "preco": 0,
            "site": "http://www.institutodemeditacao.com.br/"
        }, {
            "nome": "Meditação Transcendental",
            "unidades": 1,
            "procura": 1353290,
            "preco": 0,
            "site": "http://meditacaotranscendental.com.br/"
        }, {
            "nome": "Yoga Flow",
            "unidades": 2,
            "procura": 4530,
            "preco": 450,
            "site": "http://www.yogaflow.com.br/"
        }];

        activate(vm.dados);

        ////////////////

        function activate(dados) {
            console.log(vm.title);

            ///// ativa circliful-chart
            $('.circliful-chart').circliful();

            ///// carrega dados google.charts.load
            google.charts.load('current', {
                'packages': ['corechart', 'bar', 'table']
            });

            ///// chama metodo de inicializacao
            google.charts.setOnLoadCallback(drawStuff);

            var ctx = document.getElementById("chart1");

            var dados = [{
                "nome": "deRose",
                "unidades": 18,
                "procura": 1000000,
                "preco": 479,
                "site": "https://www.metododerose.org/"
            }, {
                "nome": "Centro de Meditação Kadampa",
                "unidades": 8,
                "procura": 768160,
                "preco": 100,
                "site": "http://www.meditadoresurbanos.org.br/"
            }, {
                "nome": "Sri Chinmay",
                "unidades": 5,
                "procura": 17300,
                "preco": 0,
                "site": "http://www.meditacaosp.com/sobre-sri-chinmoy/"
            }, {
                "nome": "Instituto Nacional de Meditacao",
                "unidades": 1,
                "procura": 125000,
                "preco": 0,
                "site": "http://www.institutodemeditacao.com.br/"
            }, {
                "nome": "Meditação Transcendental",
                "unidades": 1,
                "procura": 1353290,
                "preco": 0,
                "site": "http://meditacaotranscendental.com.br/"
            }, {
                "nome": "Yoga Flow",
                "unidades": 2,
                "procura": 4530,
                "preco": 450,
                "site": "http://www.yogaflow.com.br/"
            }];

            function drawStuff() {
                var concorrentesUnidades = [];
                var concorrentesProcura = [];
                var concorrentesTicket = [];

                //// seta cabeçalho
                concorrentesUnidades.push(['Concorrente', 'Unidades']);
                concorrentesProcura.push(['Concorrente', 'Pesquisas']);
                concorrentesTicket.push(['Concorrente', 'Ticket Médio']);

                //// itera dados preenchendo dados
                dados.map(function(concorrente) {
                    //// add conteudo unidades
                    concorrentesUnidades.push([
                        concorrente.nome, concorrente.unidades
                    ]);

                    //// add conteudo procura
                    concorrentesProcura.push([
                        concorrente.nome, concorrente.procura
                    ]);

                    //// add conteudo ticket medio
                    concorrentesTicket.push([
                        concorrente.nome, concorrente.preco
                    ]);
                });

                var data = google.visualization.arrayToDataTable(concorrentesUnidades);
                var dataProcura = google.visualization.arrayToDataTable(concorrentesProcura);
                var dataTickets = google.visualization.arrayToDataTable(concorrentesTicket);
                var dataTicketsGasto = google.visualization.arrayToDataTable([
                    ['Gastos', 'Valor'],
                    ['Outros', 73],
                    ['Meditação', 27],
                ]);

                var defaultBarOptions = {
                    legend: {
                        textStyle: {
                            color: '#FFFFFF'
                        }
                    },
                    textStyle: {
                        color: "#FFFFFF"
                    },
                    backgroundColor: '#2d353d'
                };

                var defaultPieOptions = {
                    is3D: true,
                    backgroundColor: '#2d353d',
                    pieSliceTextStyle: {
                        color: 'white'
                    },
                    legend: {
                        textStyle: {
                            color: '#ffffff'
                        }
                    },
                };

                var defaultDonutOptions = {
                    pieHole: 0.4,
                    backgroundColor: '#2d353d',
                    pieSliceTextStyle: {
                        color: 'white'
                    },
                    legend: {
                        textStyle: {
                            color: '#ffffff'
                        }
                    },
                };

                function drawUnidadesPie() {
                    var pieChart = new google.visualization.PieChart(document.getElementById('pieChartUnidades'));

                    ///// desenha grafico de pizza
                    pieChart.draw(data, defaultPieOptions);
                }

                function drawBarChartUnidades() {
                    var chartDiv = document.getElementById('barChartUnidades');

                    var view = new google.visualization.DataView(data);

                    view.setColumns([0, 1, {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    }]);

                    var chart = new google.visualization.ColumnChart(chartDiv);
                    chart.draw(view, defaultBarOptions);
                }


                function drawSearchChart() {
                    var piechartSearchDiv = document.getElementById('piechartSearch');
                    var barchartSearchDiv = document.getElementById('barChartSearch');

                    var SearchPieChart = new google.visualization.PieChart(piechartSearchDiv);
                    SearchPieChart.draw(dataProcura, google.charts.Bar.convertOptions(defaultBarOptions));

                    var chartDiv = document.getElementById('barChartUnidades');

                    var view = new google.visualization.DataView(dataProcura);

                    view.setColumns([0, 1, {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    }]);

                    var options = {
                        backgroundColor: '#2d353d',
                        legend: {
                            textStyle: {
                                color: '#ffffff'
                            }
                        },
                    };

                    var chart = new google.visualization.ColumnChart(barchartSearchDiv);
                    chart.draw(view, defaultBarOptions);
                }

                function drawTicketChart() {
                    var barchartTicketDiv = document.getElementById('ticketMedioChart');

                    var view = new google.visualization.DataView(dataTickets);

                    view.setColumns([0, 1, {
                        calc: "stringify",
                        sourceColumn: 1,
                        type: "string",
                        role: "annotation"
                    }]);

                    var chart = new google.visualization.ColumnChart(barchartTicketDiv);

                    chart.draw(view, defaultBarOptions);
                }

                function drawTicketGasto() {
                    var piechartGastoMedioDiv = document.getElementById('gastoMedioChart');

                    var chart = new google.visualization.PieChart(piechartGastoMedioDiv);

                    chart.draw(dataTicketsGasto, defaultDonutOptions);
                }


                var perfilChartDiv = document.getElementById('lazerChart');

                function drawPerfilConsumidor() {
                    var perfilChartDiv = document.getElementById('perfilChart');
                    var dataTicketsGasto = google.visualization.arrayToDataTable([
                        ['Tipo de Gasto', 'Valor'],
                        ['Entretenimento', 389],
                        ['Produtos', 223],
                        ['Servicos', 137]
                    ]);

                    var chart = new google.visualization.PieChart(perfilChartDiv);
                    chart.draw(dataTicketsGasto, defaultPieOptions);
                }

                function drawLazerChart() {
                    var perfilChartDiv = document.getElementById('lazerChart');

                    var dataLazerConsumidor = google.visualization.arrayToDataTable([
                        ['Tipo de Gasto', 'Valor'],
                        ['Viagens', 425],
                        ['Baladas', 320],
                        ['Restaurantes', 301],
                        ['Dia a dia', 270],
                    ]);

                    var chart = new google.visualization.PieChart(perfilChartDiv);
                    chart.draw(dataLazerConsumidor, defaultDonutOptions);
                }

                drawUnidadesPie();
                drawBarChartUnidades();
                drawSearchChart();
                drawTicketChart();
                drawTicketGasto();
                drawPerfilConsumidor();
                //drawLazerChart();

                drawPieChart('lazerChart', [
                    ['Tipo de Gasto', 'Valor'],
                    ['Viagens', 425],
                    ['Baladas', 320],
                    ['Restaurantes', 301],
                    ['Dia a dia', 270],
                ]);
            }


        }

        function drawPieChart(elementID, dados) {
            var chartDiv = document.getElementById(elementID);

            var data = google.visualization.arrayToDataTable(dados);

            var defaultDonutOptions = {
                pieHole: 0.4,
                backgroundColor: '#2d353d',
                pieSliceTextStyle: {
                    color: 'white'
                },
                legend: {
                    textStyle: {
                        color: '#ffffff'
                    }
                },
            };

            var chart = new google.visualization.PieChart(chartDiv);
            chart.draw(data, defaultDonutOptions);
        }

    });