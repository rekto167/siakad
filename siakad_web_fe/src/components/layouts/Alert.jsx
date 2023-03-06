import {connect} from "react-redux";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

const Alert = ({alerts}) => {
    alerts.map(
        alert => {
            const Toast = Swal.mixin({
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

            Toast.fire({
                icon: alert.alertType,
                title: alert.message
            })
        }
    )

    return null

    // return (
    //     <div className="fixed inline-block top-17 right-0">
    //         {
    //             alerts.map(
    //                 alert => (
    //                     <div key={alert.id} className={`p - 3 px-20 text-white font-semibold ${
    //                         alert.alertType == 'error' ? 'bg-red-500' :
    //                             alert.alertType == 'success' ? 'bg-green-500' :
    //                             alert.alertType == 'warning' ? 'bg-yellow-500' : ''
    //                     }`}>
    //                         <span>{alert.message}</span>
    //                     </div>
    //                 )
    //             )
    //         }
    //     </div>
    // )
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(Alert);