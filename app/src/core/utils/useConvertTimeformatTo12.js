const useConvertTimeformatTo12 = (format) => {
    let time = format;
    let [hr, min, sec] = (time && time?.length) ? time?.split(':')?.map(Number) : ['--', '--', '--'];
    let type = hr < 12 ? 'AM' : hr >= 12 ? 'PM' : '';
    hr = hr > 12 ? ((((hr - 12) < 10) ? '0' : '') + (hr - 12)) : hr;
    min = min < 10 ? ('0' + min) : min;
    return [hr || 12, min || '00', sec || '00', type];
  };

  export default useConvertTimeformatTo12;
