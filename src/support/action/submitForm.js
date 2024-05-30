/**
 * Submit the given form
 * @param  {String}   formSelector Form element selector
 */
export default (formSelector) => {
  const form = $(formSelector);
  form.submit();
};
