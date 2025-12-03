import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const VistaPreviaEvidence = () => {
    const {evidenciaId} = useParams();
    console.log(evidenciaId);

    return (
        <div className='w-full h-screen relative'>
            <iframe 
                // src="https://view.officeapps.live.com/op/embed.aspx?src=https://colaboracion.dnp.gov.co/CDT/DNP/SUBDIRECCI%C3%93N%20DE%20RECURSOS%20HUMANOS/EVALUACION%20INICIAL%20SGSST%20ARL%20POSITIVA.xlsx?Mobile=1&Source=%2FCDT%2F_layouts%2F15%2Fmobile%2Fviewa.aspx%3FList%3De44ac768-6f6e-4f63-a2f5-a5d6f0a0f012%26View%3Dc3c0447e-b31f-46dd-9c6e-351e5cc4211b%26RootFolder%3D%252FCDT%252FDNP%252FSUBDIRECCI%25u00d3N%2BDE%2BRECURSOS%2BHUMANOS%26wdFCCState%3D1%26PageFirstRow%3D121" 
                src="https://view.officeapps.live.com/op/embed.aspx?src=https://leyes.senado.gov.co/proyectos/images/documentos/textos%20radicados/proyectos%20de%20ley/2019%20-%202020/PL%20117-19%20Salud.docx"
                title="Vista Previa"
                style={{ width: "100%", height: "90%" }}
                allowFullScreen
                sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
            >
            </iframe>
        </div>
    );
}

export default VistaPreviaEvidence