import Swal from "sweetalert2";

const SweetAlertService = {
    success(title, text) {
        return Swal.fire({
            title: title,
            text: text,
            icon: "success",
            confirmButtonText: "OK",
        });
    },

    error(title, text) {
        return Swal.fire({
            title: title,
            text: text,
            icon: "error",
            confirmButtonText: "OK",
        });
    },

    warning(title, text) {
        return Swal.fire({
            title: title,
            text: text,
            icon: "warning",
            confirmButtonText: "OK",
        });
    },

    info(title, text) {
        return Swal.fire({
            title: title,
            text: text,
            icon: "info",
            confirmButtonText: "OK",
        });
    },
    process(title, text) {
        return Swal.fire({
            title: title,
            text: text,
            icon: "info",
            confirmButtonText: "Yes, Continue",
            denyButtonText: "Cancel",
            showDenyButton: true,
        });
    },
    
};


const ToastrService = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

export default {SweetAlertService, ToastrService};
