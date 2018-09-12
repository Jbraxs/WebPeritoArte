
$(document).ready(function() {
  //VALIDADOR
  $.validate({
    lang: "es",
    modules: "security"
  });
  //MENU DE NAVEGACION TABLAS ADMIN
  $(".sidebar-menu").tree();
  $("#usuarios").DataTable({
    paging: true,
    lengthChange: false,
    searching: true,
    ordering: true,
    info: true,
    autoWidth: false,
    language: {
      paginate: {
        next: "Siguiente",
        previous: "Anterior",
        last: "Último",
        first: "Primero"
      },
      info: "Listando _START_ a _END_ de _TOTAL_ resultados",
      emptyTable: "No hay usuarios registrados",
      infoEmpty: "0 Usuarios",
      search: "Buscar"
    }
  });
  $(".select2").select2();
  $("input").iCheck({
    checkboxClass: "icheckbox_square-blue",
    radioClass: "iradio_square-blue",
    increaseArea: "20%" // optional
  });
  //SWEETALERT2
  $(".btnDel").on("click", function(e) {
    e.preventDefault(); // Detiene los prximos eventos
    swal({
      title: "Esta usted seguro?",
      text: "Una vez eliminado no se puede recuperar!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, deseo eliminar!"
    }).then(result => {
      url = $(this).attr('href');
      $(location).attr('href', url);
  
    });
  });
  $(".btnUpd").on("click", function(e) {
    e.preventDefault(); // Detiene los prximos eventos
    swal({
      title: "Esta usted seguro de modificar sus datos?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, modificarlos!"
    }).then(result => {
      url = $(this).attr('href');
      $(location).attr('href', url);
  
    });
  });

  //COOKIES
  function getCookie(c_name){
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1){
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1){
        c_value = null;
    }else{
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1){
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}
 
function setCookie(c_name,value,exdays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}
 
if(getCookie('tiendaaviso')!="1"){
    document.getElementById("barraaceptacion").style.display="block";
}
function PonerCookie(){
    setCookie('tiendaaviso','1',365);
    document.getElementById("barraaceptacion").style.display="none";
}


});
