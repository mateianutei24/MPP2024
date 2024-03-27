const buildAddCompanyRequest = (addCompanyRequestValidator) => {
  return ({ id, name, address, numberOfEmployees } = {}) => {
    let { error } = addCompanyRequestValidator({
      id,
      name,
      address,
      numberOfEmployees,
    });
    if (error) throw new Error(error);

    return {
      getId: () => id,
      getName: () => name,
      address: () => address,
      numberOfEmployees: () => numberOfEmployees,
    };
  };
};

module.exports = buildAddCompanyRequest;
