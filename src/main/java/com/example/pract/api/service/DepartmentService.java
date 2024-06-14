package com.example.pract.api.service;


import com.example.pract.api.model.Department;
import com.example.pract.api.repo.DepartmentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private DepartmentRepo departmentRepo;


    @Autowired
    public DepartmentService(DepartmentRepo departmentRepo) {
        this.departmentRepo = departmentRepo;
    }

    public Department findById(Long id) {
        Optional<Department> department = departmentRepo.findById(id);
        return department.orElse(null);
    }

    public Department save(Department department) {
        Department department1 = new Department();
        department1.setName(department.getName());
        department1.setManagerId(department.getManagerId());
        departmentRepo.save(department1);
        return department1;
    }

    public Department update(Long id, Department department) {
        Optional<Department> departmentOptional = departmentRepo.findById(id);
        if (departmentOptional.isPresent()) {
            Department department1 = departmentOptional.get();
            department1.setName(department.getName());
            department1.setManagerId(department.getManagerId());
            departmentRepo.save(department1);
            return department1;
        }
        else {
            throw new RuntimeException("Department not found with id " + id);
        }
    }

    public void delete(Long id) {
        Optional<Department> departmentOptional = departmentRepo.findById(id);
        if (departmentOptional.isPresent()) {
            departmentRepo.deleteById(id);
        }
    }
}
