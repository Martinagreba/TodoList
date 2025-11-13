import AuthLayout from '@/components/AuthLayout';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { auth } from '../../firebaseConfig';

const SignUpSchema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6, 'Must match the password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
type SignUpData = z.infer<typeof SignUpSchema>;

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignUpData) => {
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email.trim(),
        data.password,
      );

      await updateProfile(userCredential.user, {
        displayName: data.username,
      });

      Alert.alert('Success', 'Account created. Now log in');
      router.push('/login');
    } catch (error: any) {
      Alert.alert('Registration error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <AuthLayout>
      <View style={styles.header}>
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, value } }) => (
            <>
              <Input
                placeholder="User Name"
                value={value}
                onChangeText={onChange}
                style={[
                  errors.username ? { borderWidth: 1, borderColor: '#ED3535' } : {},
                ]}
              />
              {errors.username && (
                <Text style={styles.error}>{errors.username.message}</Text>
              )}
            </>
          )}
        />
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
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <>
              <Input
                placeholder="Confirm password"
                secureTextEntry
                value={value}
                onChangeText={onChange}
                style={[
                  errors.confirmPassword
                    ? { borderWidth: 1, borderColor: '#ED3535' }
                    : {},
                ]}
              />
              {errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword.message}</Text>
              )}
            </>
          )}
        />
      </View>
      <Button
        title={loading ? 'Creating...' : 'Sign Up'}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Do you have an account?</Text>
        <TouchableOpacity onPress={goToLogin}>
          <Text style={styles.footerLink}>Come in</Text>
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
    fontWeight: 600,
  },
  footerLink: {
    color: '#688EFF',
    fontWeight: 600,
    fontSize: 16,
    marginTop: 8,
  },
  error: {
    color: '#ED3535',
    fontSize: 16,
  },
});
