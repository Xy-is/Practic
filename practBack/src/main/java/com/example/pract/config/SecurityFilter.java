package com.example.pract.config;

import com.example.pract.api.model.Permission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityFilter {



    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http
                .csrf(csrfConfig -> csrfConfig.disable())
                .sessionManagement(sessionMangConfig -> sessionMangConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests( authConfig -> {
                    authConfig.requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll();
                    authConfig.requestMatchers(HttpMethod.GET, "/swagger-ui/**").permitAll();
                    authConfig.requestMatchers(HttpMethod.GET, "/v3/api-docs/**").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/api/auth/register").permitAll();
                    authConfig.requestMatchers("/error").permitAll();
                   // authConfig.requestMatchers(HttpMethod.GET, "/api/employee/get").hasAuthority(Permission.READ_EMPLOYEE.name());
                    authConfig.requestMatchers(HttpMethod.GET, "/api/employee/**").hasAuthority(Permission.READ_EMPLOYEE.name());
                    authConfig.requestMatchers(HttpMethod.PUT, "/api/employee/**").hasAuthority(Permission.CHANGE_EMPLOYEE.name());
                    authConfig.requestMatchers(HttpMethod.POST, "/api/employee/**").hasAuthority(Permission.CHANGE_EMPLOYEE.name());
                    authConfig.requestMatchers(HttpMethod.DELETE, "/api/employee/**").hasAuthority(Permission.CHANGE_EMPLOYEE.name());

                    authConfig.requestMatchers(HttpMethod.GET, "/api/department/**").hasAuthority(Permission.READ_DEPARTMENT.name());
                    authConfig.requestMatchers(HttpMethod.POST, "/api/department/**").hasAuthority(Permission.CHANGE_DEPARTMENT.name());
                    authConfig.requestMatchers(HttpMethod.PUT, "/api/department/**").hasAuthority(Permission.CHANGE_DEPARTMENT.name());
                    authConfig.requestMatchers(HttpMethod.DELETE, "/api/department/**").hasAuthority(Permission.CHANGE_DEPARTMENT.name());

                    authConfig.requestMatchers(HttpMethod.GET, "/api/tasks/**").hasAuthority(Permission.READ_TASK.name());
                    authConfig.requestMatchers(HttpMethod.PUT, "/api/tasks/**").hasAuthority(Permission.CHANGE_TASK.name());
                    authConfig.requestMatchers(HttpMethod.DELETE, "/api/tasks/**").hasAuthority(Permission.CHANGE_TASK.name());
                    authConfig.requestMatchers(HttpMethod.POST, "/api/tasks/**").hasAuthority(Permission.CHANGE_TASK.name());

                    authConfig.requestMatchers(HttpMethod.GET, "/api/project/**").hasAuthority(Permission.READ_PROJECT.name());
                    authConfig.requestMatchers(HttpMethod.PUT, "/api/project/**").hasAuthority(Permission.CHANGE_PROJECT.name());
                    authConfig.requestMatchers(HttpMethod.POST, "/api/project/**").hasAuthority(Permission.CHANGE_PROJECT.name());
                    authConfig.requestMatchers(HttpMethod.DELETE, "/api/project/**").hasAuthority(Permission.CHANGE_PROJECT.name());
                    authConfig.anyRequest().denyAll();


                }).build();

    }
}
