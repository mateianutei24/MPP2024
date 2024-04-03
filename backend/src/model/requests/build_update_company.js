const buildUpdateCompanyRequest = (updateCompanyReqValidator) => {
  return ({ id, name, address, numberOfEmployees } = {}) => {
    let { error } = updateCompanyReqValidator({
      id,
      name,
      address,
      numberOfEmployees,
    });
    if (error) throw new Error(error);

    return {
      getId: () => id,
      getName: () => name,
      getAddress: () => address,
      getNumberOfEmployees: () => numberOfEmployees,
    };
  };
};

module.exports = buildUpdateCompanyRequest;
