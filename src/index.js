function enviarCorreo(datos = { Para: '', Logo: '' }) {

  $.each($(".Requerido"), function (index, Control) {
    if (Control.value == "") $("#" + Control.id).addClass("Error");
    else $("#" + Control.id).removeClass("Error");
  });

  if (validarEmail($("#TxtEmail").val())) {
    $("#TxtEmail").addClass("Error");
  }
  else {
    $("#TxtEmail").removeClass("Error");
  }

  if (!$(".Error").length > 0) {
    $("#Progress").show();
    $.ajax({
      type: "GET",
      url: "https://tik.com.co/ServicioWeb.asmx/EnviarCorreoPaginasTik",
      crossDomain: true,
      data: {
        Nombre: $("#TxtNombre").val(),
        Telefono: $("#TxtTelefono").val(),
        CorreoEle: $("#TxtEmail").val(),
        Asunto: $("#TxtAsunto").val(),
        Mensaje: $("#TxtMensaje").val(),
        Para: datos.Para,
        Logo: datos.Logo,
        Fecha: "",
      },
      contentType: "application/json; charset=utf-8",
      dataType: "jsonp",
      timeout: 10000,
      success: function (R) {
        $.each(R.Correo, function (i, N) {
          if (N.Enviado == "true") {
            $("#Progress").hide();
            swal("Mensaje enviado con exito!", "", "success");
            $.each($(".Requerido"), function (index, Control) {
              $("#" + Control.id).val("");
            });
          } else {
            $("#Progress").hide();
            swal("Mensaje no enviado!", "", "error");
          }
        });
      },
      error: function (error) {
        $("#Progress").hide();
        swal(
          "Alerta!",
          "El formulario no se diligenció correctamente. Por favor verifique los campos resaltados e intente de nuevo",
          "warning"
        );
      },
    });
  } else
    Swal.fire(
      {
        title: '¡Alerta!',
        text: 'El formulario no se diligenció correctamente. Por favor verifique los campos resaltados e intente de nuevo',
        icon: 'warning',
        confirmButtonText: 'Ok'
      }
    );
}

function validarEmail(valor) {
  var filter = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
  if (filter.test(valor)) {
    return false;
  } else {
    return true;
  }
}