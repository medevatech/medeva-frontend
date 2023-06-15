import React, { useEffect } from 'react';
import { Row, Card, CardTitle } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { Colxx } from 'components/common/CustomBootstrap';

const Error = ( ) => {
  let history = useHistory();

  function goBack() {
    history.goBack();
  }

  useEffect(() => {
    document.body.classList.add('background');
    document.body.classList.add('no-footer');

    return () => {
      document.body.classList.remove('background');
      document.body.classList.remove('no-footer');
    };
  }, []);

  return (
    <>
      <div className="fixed-background" />
      <main>
        <div className="container">
          <Row className="h-100">
            <Colxx xxs="12" md="10" className="mx-auto my-auto">
              <Card className="auth-card">
                <div className="position-relative image-side ">
                  <p className="text-white h2">MEDEVA</p>
                  <p className="white mb-0">Telah terjadi kesalahan pada sistem</p>
                </div>
                <div className="form-side">
                  <NavLink to="/" className="white">
                    <span className="logo-single" />
                  </NavLink>
                  {/* <CardTitle className="mb-4">
                    Ooops... looks like an error occurred!
                  </CardTitle> */}
                  <p className="mb-0 text-muted text-small mb-0">
                    Telah terjadi kesalahan pada sistem
                  </p>
                  <p className="display-1 font-weight-bold mt-2 mb-5">404</p>
                  <NavLink
                    onClick={goBack}
                    to={{}}
                    className="btn btn-primary btn-shadow btn-lg"
                  >
                    KEMBALI
                  </NavLink>
                </div>
              </Card>
            </Colxx>
          </Row>
        </div>
      </main>
    </>
  );
};

export default Error;
