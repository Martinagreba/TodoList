import AuthLayout from '@/components/AuthLayout';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { auth } from '../../firebaseConfig';

const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type LoginData = z.infer<typeof LoginSchema>;

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email.trim(), data.password);
      Alert.alert('Success', 'Login successful');
      router.replace('/(tabs)/home');
    } catch (error: any) {
      Alert.alert('Login error', 'Incorrect email or password');
    } finally {
      setLoading(false);
    }
  };

  const goToSignUp = () => {
    router.push('/signup');
  };

  return (
    <AuthLayout>
      <View style={styles.header}>
        <Text style={styles.title}>Log In</Text>
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <>
              <Input
                placeholder="Email address"
                value={value}
                onChangeText={onChange}
                style={[errors.email ? { borderWidth: 1, borderColor: '#ED3535' } : {}]}
              />
              {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
            </>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <>
              <Input
                placeholder="Password"
                value={value}
                secureTextEntry
                onChangeText={onChange}
                style={[
                  errors.password ? { borderWidth: 1, borderColor: '#ED3535' } : {},
                ]}
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password.message}</Text>
              )}
            </>
          )}
        />
      </View>
      <Button
        title={loading ? 'Logging in...' : 'Log In'}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don&apos;t have an account? </Text>
        <TouchableOpacity onPress={goToSignUp}>
          <Text style={styles.footerLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
    marginTop: 18,
  },
  footerText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerLink: {
    color: '#688EFF',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 8,
  },
  error: {
    color: '#ED3535',
    fontSize: 16,
  },
});
