const Modal = ({ isOpen, onClose, title, children }) => {

    if (!isOpen) return null;

    return (

        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000
            }}
        >

            <div
                style={{
                    width: "500px",
                    background: "#fff",
                    borderRadius: "10px",
                    padding: "20px"
                }}
            >

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >

                    <h2>{title}</h2>

                    <button onClick={onClose}>X</button>

                </div>

                <hr />

                {children}

            </div>

        </div>

    );

};

export default Modal;