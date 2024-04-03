const buildAddCompanyRequest = (addCompanyRequestValidator) => {
  return ({ name, address, numberOfEmployees } = {}) => {
    let { error } = addCompanyRequestValidator({
      name,
      address,
      numberOfEmployees,
    });
    if (error) throw new Error(error);

    return {
      getName: () => name,
      getAddress: () => address,
      getNumberOfEmployees: () => numberOfEmployees,
    };
  };
};

module.exports = buildAddCompanyRequest;
