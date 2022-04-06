import './modal.css'

import { FiX } from 'react-icons/fi'

export default function Moda({content, close}) {
    return(
        <div className='modal'>
            <div className='container'>
                <button className='close' onClick={close}>
                    <FiX size={23} color="FFF"/>
                    Back
                </button>

                <div>
                    <h2>
                        Tasks details
                    </h2>

                    <div className='row'>
                        <span>
                            Customer: <i>{content.cliente}</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            Subject: <i>{content.assunto}</i>
                        </span>
                        <span>
                            Created: <i>{content.createdFormated}</i>
                        </span>
                    </div>

                    <div className='row'>
                        <span>
                            Status: <i style={{ color: '#FFF', backgroundColor: content.status === 'Open' ? '#5cb85c' : '#999' }}>
                                {content.status}</i>
                        </span>
                    </div>

                    {content.complemento !== '' && (
                        <>
                            <h3>Additional</h3>
                            <p>
                                {content.complemento}
                            </p>
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}