package com.example.pract.api.controller;


import com.example.pract.api.dto.EmployeeDto;
import com.example.pract.api.model.Employee;

import com.example.pract.api.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping("/create")
    public ResponseEntity createEmployee(@RequestBody Employee employee) {
        System.out.println(employee);
        Employee emp =  employeeService.create(employee);
        if(emp != null) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @GetMapping("/findbylastname")
    public ResponseEntity<List<Employee>> getEmployeesByLastName(@RequestParam String lastName){
        List<Employee> employees = employeeService.getByLastName(lastName);
        if (employees.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(employees);
        }
    }

    @GetMapping("/get")
    public ResponseEntity<List<EmployeeDto>> getEmployees(){
        List<EmployeeDto> employees = employeeService.getAll();
        if (employees.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(employees);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        employeeService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/change")
    public ResponseEntity<Employee> changeEmployee(@RequestParam String lastName, @RequestParam String position) {
        Employee updatedEmployee = employeeService.change(lastName, position);
        if (updatedEmployee != null) {
            return ResponseEntity.ok(updatedEmployee);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
