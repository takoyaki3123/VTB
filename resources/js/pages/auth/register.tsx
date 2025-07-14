import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Input } from '@/components/ui/input';
import '../../../css/common.scss'

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    [key: string]: string; // for vscode use RegisterForm error
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className='container-half mx-auto'>
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal text-center">アカウント登録</h1>
                <div className="form-floating py-1">
                    <Input type="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required className="form-control" id="name"/>
                    <InputError message={errors.name} />
                    <label htmlFor="acct">名前</label>
                </div>
                <div className="form-floating py-1">
                    <Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required className="form-control" id="email"/>
                    <InputError message={errors.email} />
                    <label htmlFor="acct">Email</label>
                </div>
                <div className="form-floating py-1">
                    <Input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} required className="form-control" id="password"/>
                    <InputError message={errors.password} />
                    <label htmlFor="acct">Password</label>
                </div>
                <div className="form-floating py-1">
                    <Input type="password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} required className="form-control" id="password_confirmation"/>
                    <InputError message={errors.password_confirmation} />
                    <label htmlFor="acct">Password確認</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit" disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    確認
                </button>
                <div className="text-muted-foreground text-center text-sm">
                    アカウントを持ってます？{' '}
                    <TextLink href={route('login')} tabIndex={6}>
                        ログイン
                    </TextLink>
                </div>
            </form>
        </div>
    );
}
