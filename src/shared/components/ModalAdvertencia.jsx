import Modal from "./Modal"

const ModalAdvertencia = (props) => {
    const {cerrarModal, title, message} = props
    return (
        <Modal
            isOpenModal={true}
            setIsOpenModal={cerrarModal}
            title={title}
            size="sm"
        >
            <div className="text-center">
                {message}
            </div>
        </Modal>
    )
}

export default ModalAdvertencia