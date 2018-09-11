$(document).ready(function () {
  //VALIDADOR
  $.validate({
    modules : 'date, security',
    onModulesLoaded : function() {
      
    }
  }); 
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
    //SWEETALERT2
    $('.btnAlert').on('click', function (e) {
      e.preventDefault(); // Detiene los prximos eventos
      swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        timer: 2000,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
        });

      
  });





