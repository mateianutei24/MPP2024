const getCompanyRequest = (getCompanyRequestValidator) => {
  return ({ id } = {}) => {
    let { error } = getCompanyRequestValidator({
      id,
    });
    if (error) throw new Error(error);

    return {
      getId: () => id,
    };
  };
};

module.exports = getCompanyRequest;
