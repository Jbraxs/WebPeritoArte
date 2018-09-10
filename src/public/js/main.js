  $(document).ready(function () {
    //MENU DE NAVEGACION TABLAS ADMIN
    $('.sidebar-menu').tree()
    $('#usuarios').DataTable({
      'paging'      : true,
      'lengthChange': false,
      'searching'   : true,
      'ordering'    : true,
      'info'        : true,
      'autoWidth'   : false,
      'language'    : {
        paginate: {
          next: 'Siguiente',
          previous: 'Anterior',
          last: 'Último',
          first:'Primero'
        },
        info: 'Listando _START_ a _END_ de _TOTAL_ resultados',
        emptyTable: 'No hay usuarios registrados',
        infoEmpty: '0 Usuarios',
        search: 'Buscar'
      }
    })
    $('.select2').select2()
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' // optional
    });
  });