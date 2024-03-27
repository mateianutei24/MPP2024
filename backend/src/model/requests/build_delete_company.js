const buildDeleteCompanyRequest = (deleteCompanyRequestValidator) => {
  return ({ id } = {}) => {
    let { error } = deleteCompanyRequestValidator({
      id,
    });
    if (error) throw new Error(error);

    return {
      getId: () => id,
    };
  };
};

module.exports = buildDeleteCompanyRequest;
