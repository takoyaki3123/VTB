// Components
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';

import '../../../css/common.scss';
export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AppLayout>
            <div className='container-half mx-auto'>
                {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

                <div className="space-y-6">
                    <form onSubmit={submit}>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address：</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="off"
                                value={data.email}
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="my-4 flex items-center justify-start">
                            <Button className="btn btn-primary" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Email password reset link
                            </Button>
                        </div>
                    </form>

                    <div className="text-muted-foreground space-x-1 text-center text-sm">
                        <span>Or, return to</span>
                        <TextLink href={route('login')}>log in</TextLink>
                    </div>
                </div>

            </div>
        </AppLayout>
    );
}
