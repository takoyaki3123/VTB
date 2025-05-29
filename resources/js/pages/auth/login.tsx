/* eslint-disable @typescript-eslint/no-explicit-any */
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Input } from '@/components/ui/input';
import '../../../css/common.scss'

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
    [key: string]: any;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: "",
        password: "",
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => {reset('password');},
        });
    };

    return (
        <div className='container-half mx-auto'>
            <Head title="Log in" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="container-half mx-auto">
                    {/* <img className="mb-4" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/> */}
                    <h1 className="h3 mb-3 fw-normal text-center">ログイン</h1>

                    <div className="form-floating py-1">
                        <Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required className="form-control" id="email" placeholder="name@example.com"/>
                        <InputError message={errors.email} />
                        <label htmlFor="acct">アカウント</label>
                    </div>
                    <div className="form-floating py-1">
                        <Input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="form-control" id="ps" placeholder="Password"/>
                        <InputError message={errors.password} />
                        <label htmlFor="ps">パスワード</label>
                        {canResetPassword && (
                            <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                                Forgot password?
                            </TextLink>
                        )}
                        <TextLink href={route('register')} className="ml-auto text-sm" tabIndex={5}>
                            登録
                        </TextLink>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        ログイン
                    </button>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </div>
    );
}
