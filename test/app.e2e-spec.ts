/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from './../src/app.module';

import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import * as pactum from 'pactum'
import { CreateUserDto } from "src/auth/DTO/create-user.dto";
//import { CreateBookDto } from "src/bookmark/DTO/create-book.dto";
//src/bookmark/DTO/create-book.dto
// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/')
//       .expect(200)
//       .expect('Hello World!');
//   });
// });

describe('App e2e', ()=> {
  let app:INestApplication;
  beforeAll( async () => {
    const moduleref =
      await Test.createTestingModule({
        imports:[AppModule],
      }).compile();
    app = moduleref.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist:true,
      }),
    );
    await app.init();
    await app.listen(3000);
    pactum.request.setBaseUrl('http://localhost:3000');
  });
  afterAll(() => {
    app.close();
  });
  describe('User',() => {
    const dto:CreateUserDto = {
      name:'mmm',
      age:33,
      address:'ssss',
      email:'mmm@gmail.com',
      password:'slsfj'
    }
    describe('Signup',() => {
      it('should throw if email empty',()=>{
        return pactum
          .spec()
          .post('/user')
          .withBody({email:dto.email,})
          .expectStatus(400);
      });
      it('should signup',()=>{
        return pactum
          .spec()
          .post('/user')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Signin',() => {
      //let accesstoken:string;
      it('should signin',()=>{
        return pactum
          .spec()
          .get('/user/signin')
          .withBody(dto)
          .expectStatus(200)
          .inspect()
          .stores('userAt','accesstoken');
      });
    });
  });
  // describe('Auth',() => {
  //   describe('Get user',() => {
  //     it('should get current user',()=>{
  //       return pactum
  //         .spec()
  //         .post('/user')
  //         .expectStatus(200)
  //         .withHeaders({
  //           Authorization:'Bearer $S{userAt}',
  //         })
  //         .expectStatus(200)
  //         .inspect();
  //     });
  //   });
  //   describe('Edit user',() => {
  //     it('should edit current user',()=>{
  //       const dto:Edituserdto = {
  //         name:
  //         emai:
  //         password:
  //       }
  //       return pactum
  //         .spec()
  //         .patch('/user')
  //         .expectStatus(200)
  //         .withHeaders({
  //           Authorization:'Bearer $S{userAt}',
  //         })
  //         .withBody(dto)
  //         .expectStatus(200)
  //         .inspect()
  //         .expectBodyContains(dto.name)
  //         .expectBodyContains(dto.email);
  //     });
  //   });
  // });
  describe('Bookmark',() => {
    describe('Get Bookmark',() => {
      it('should get bookmarks',()=>{
        return pactum
        .spec()
        .get('/bookmark')
        .withHeaders({Authorization:'Bearer $S{userAt}'})
        .expectStatus(200)
        .inspect()
      })
    });
    // describe('Create Bookmark',() => {
    //   const Dto:CreateBookDto = {
    //     name:'testbook',
    //     releasetime:101010,
    //     author:'mohamedtest'
    //   };
    //   it('should create bookmarks',()=>{
    //     return pactum
    //     .spec()
    //     .post('/bookmark')
    //     .withHeaders({Authorization:'Bearer $S{userAt}'})
    //     .withBody(Dto)
    //     .expectStatus(201);
    //   });
    // });
    // describe('Get bookmark by id', () => {
    //   it('should get bookmark by id', () => {
    //     return pactum
    //       .spec()
    //       .get('/bookmark/{id}')
    //       .withPathParams('id', '$S{bookmarkId}')
    //       .withHeaders({
    //         Authorization: 'Bearer $S{userAt}',
    //       })
    //       .expectStatus(200)
    //       .expectBodyContains('$S{bookmarkId}'); //.expectJsonMatch({id: '$S{bookmarkId}'}) would have been the correct way of testing to prevent false positive matches with other numbers, user id etc.
    //   });
    // });
      
  //   describe('Edit bookmark by id', () => {
  //     const dto: CreateBookDto = {
  //       title:
  //         'Kubernetes Course - Full Beginners Tutorial (Containerize Your Apps!)',
  //       description:
  //         'Learn how to use Kubernetes in this complete course. Kubernetes makes it possible to containerize applications and simplifies app deployment to production.',
  //     };
  //     it('should edit bookmark', () => {
  //       return pactum
  //         .spec()
  //         .patch('/bookmarks/{id}')
  //         .withPathParams('id', '$S{bookmarkId}')
  //         .withHeaders({
  //           Authorization: 'Bearer $S{userAt}',
  //         })
  //         .withBody(dto)
  //         .expectStatus(200)
  //         .expectBodyContains(dto.title)
  //         .expectBodyContains(dto.description);
  //     });
  //   });

  //   describe('Delete bookmark by id', () => {
  //     it('should delete bookmark', () => {
  //       return pactum
  //         .spec()
  //         .delete('/bookmarks/{id}')
  //         .withPathParams('id', '$S{bookmarkId}')
  //         .withHeaders({
  //           Authorization: 'Bearer $S{userAt}',
  //         })
  //         .expectStatus(204);
  //     });
  // });
      it.todo('should pass');
    });
});