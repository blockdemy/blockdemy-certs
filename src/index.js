import FormData from 'form-data';
import CertsClient from './client';

class Certs {
  constructor(APIKey) {
    CertsClient.defaults.headers.common.Authorization = `Certs ${APIKey}`;
  }

  getDocuments = () => CertsClient.get('/documents');

  getDocument = documentId => CertsClient.get(`/documents/${documentId}`);

  verify = async file => {
    try {
      const body = new FormData();
      body.append('file', file);

      const data = await CertsClient.post('/verify', body, {
        headers: {
          ...body.getHeaders()
        }
      });

      return data;
    } catch (err) {
      return err.response;
    }
  };

  postDocument = async ({
    title,
    description,
    ownerAddress,
    expires,
    signers,
    file,
    blockchain
  }) => {
    try {
      const body = new FormData();

      if (signers) {
        if (!Array.isArray(signers)) {
          throw new Error('Signers must be an array');
        }

        const signersString = JSON.stringify(signers);
        body.append('signers', signersString);
      }

      if (!blockchain) {
        // Default parameter
        blockchain = 'ETHEREUM';
      }

      body.append('title', title);
      body.append('description', description);
      body.append('ownerAddress', ownerAddress);
      body.append('expires', new Date(expires).toString());
      body.append('file', file);
      body.append('blockchain', blockchain);

      const data = await CertsClient.post('/documents', body, {
        headers: {
          ...body.getHeaders()
        }
      });

      return data;
    } catch (err) {
      return err.response;
    }
  };
}

export default Certs;
