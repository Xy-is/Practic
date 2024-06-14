package com.example.pract.api.controller;

import com.example.pract.api.model.Employee;
import com.example.pract.api.service.EmployeeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class EmployeeControllerTest {

    @InjectMocks
    EmployeeController employeeController;

    @Mock
    EmployeeService employeeService;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(employeeController).build();
    }

    @Test
    public void testCreateEmployee() throws Exception {
        when(employeeService.create(any(Employee.class))).thenReturn(new Employee());
        mockMvc.perform(post("/api/employee/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"firstName\":\"John\", \"lastName\":\"Doe\", \"position\":\"Manager\"}"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetEmployeesByLastName() throws Exception {
        when(employeeService.getByLastName(any(String.class))).thenReturn(Arrays.asList(new Employee()));
        mockMvc.perform(get("/api/employee/findbylastname?lastName=Doe"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetEmployees() throws Exception {
        when(employeeService.getAll()).thenReturn(Arrays.asList(new Employee()));
        mockMvc.perform(get("/api/employee/get"))
                .andExpect(status().isOk());
    }

    @Test
    public void testDeleteEmployee() throws Exception {
        mockMvc.perform(delete("/api/employee/delete?lastName=Doe"))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testChangeEmployee() throws Exception {
        when(employeeService.change(any(String.class), any(String.class))).thenReturn(new Employee());
        mockMvc.perform(put("/api/employee/change?lastName=Doe&position=Manager"))
                .andExpect(status().isOk());
    }
}
