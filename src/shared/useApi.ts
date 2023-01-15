import { useEffect, useState } from 'react';

const useApi = <T> (promise:()=> Promise<T>) => {
    type Return = Awaited<ReturnType<typeof promise>>
    type PromiseStatus = 'rejected' | 'fullfilled';
    const [result, setResult] = useState<null | Return>(null);
    const [status, setStatus] = useState<null | PromiseStatus>(null);

    useEffect(() => {
      let isSubscribed = true;

      (async () => {
        const reqResult = await promise().catch((e) => setStatus('rejected'));
        if (reqResult && isSubscribed) {
          setResult(reqResult);
          setStatus('fullfilled');
        }
        return () => { isSubscribed = false; };
      })();
    }, []);
    return { result, status };
};
export { useApi };
