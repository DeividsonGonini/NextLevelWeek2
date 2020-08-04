import React from 'react';
import PageHeader from '../../components/PageHeader';


function TeacherForm() {
    return (
        <div id="page-teacher-form" className="container">
            {/* title= atributo criado (no PageHeader) para ser uma variavel assim podendo ser reaproveitado*/}
            <PageHeader title="Que incrível que você quer dar aulas." />

        </div>
    )
}

export default TeacherForm;