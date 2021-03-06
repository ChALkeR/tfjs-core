/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import {doc} from '../doc';
import {ENV} from '../environment';
import {Tensor} from '../tensor';
import {assertTypesMatch, convertToTensor} from '../tensor_util';
import {TensorLike} from '../types';
import {assertShapesMatch} from '../util';
import {assertAndGetBroadcastShape} from './broadcast_util';
import {operation} from './operation';

export class CompareOps {
  /**
   * Returns the truth value of (a != b) element-wise. Supports broadcasting.
   *
   * We also expose `notEqualStrict` which has the same signature as this op and
   * asserts that `a` and `b` are the same shape (does not broadcast).
   *
   * ```js
   * const a = tf.tensor1d([1, 2, 3]);
   * const b = tf.tensor1d([0, 2, 3]);
   *
   * a.notEqual(b).print();
   * ```
   * @param a The first input tensor.
   * @param b The second input tensor. Must have the same dtype as `a`.
   */
  @doc({heading: 'Operations', subheading: 'Logical'})
  @operation
  static notEqual<T extends Tensor>(a: Tensor|TensorLike, b: Tensor|TensorLike):
      T {
    const $a = convertToTensor(a, 'a', 'notEqual');
    const $b = convertToTensor(b, 'b', 'notEqual');
    assertTypesMatch($a, $b);
    assertAndGetBroadcastShape($a.shape, $b.shape);
    return ENV.engine.runKernel(
               backend => backend.notEqual($a, $b), {$a, $b}) as T;
  }

  /**
   * Strict version of `notEqual` that forces `a` and `b` to be of the same
   * shape.
   *
   * @param a The first input tensor.
   * @param b The second input tensor. Must have the same shape and dtype as
   *     `a`.
   */
  @operation
  static notEqualStrict<T extends Tensor>(a: T|TensorLike, b: T|TensorLike): T {
    const $a = convertToTensor(a, 'a', 'notEqualStrict');
    const $b = convertToTensor(b, 'b', 'notEqualStrict');
    assertShapesMatch($a.shape, $b.shape, 'Error in notEqualStrict: ');
    return $a.notEqual($b);
  }

  /**
   * Returns the truth value of (a < b) element-wise. Supports broadcasting.
   *
   * We also expose `lessStrict` which has the same signature as this op and
   * asserts that `a` and `b` are the same shape (does not broadcast).
   *
   * ```js
   * const a = tf.tensor1d([1, 2, 3]);
   * const b = tf.tensor1d([2, 2, 2]);
   *
   * a.less(b).print();
   * ```
   * @param a The first input tensor.
   * @param b The second input tensor. Must have the same dtype as `a`.
   */
  @doc({heading: 'Operations', subheading: 'Logical'})
  @operation
  static less<T extends Tensor>(a: Tensor|TensorLike, b: Tensor|TensorLike): T {
    const $a = convertToTensor(a, 'a', 'less');
    const $b = convertToTensor(b, 'b', 'less');
    assertTypesMatch($a, $b);
    assertAndGetBroadcastShape($a.shape, $b.shape);

    return ENV.engine.runKernel(backend => backend.less($a, $b), {$a, $b}) as T;
  }

  /**
   * Strict version of `less` that forces `a` and `b` to be of the same
   * shape.
   *
   * @param a The first input tensor.
   * @param b The second input tensor. Must have the same shape and dtype as
   *     `a`.
   */
  @operation
  static lessStrict<T extends Tensor>(a: T|TensorLike, b: T|TensorLike): T {
    const $a = convertToTensor(a, 'a', 'lessStrict');
    const $b = convertToTensor(b, 'b', 'lessStrict');
    assertShapesMatch($a.shape, $b.shape, 'Error in lessStrict: ');
    return $a.less($b);
  }

  /**
   * Returns the truth value of (a == b) element-wise. Supports broadcasting.
   *
   * We also expose `equalStrict` which has the same signature as this op
   * and asserts that `a` and `b` are the same shape (does not broadcast).
   *
   * ```js
   * const a = tf.tensor1d([1, 2, 3]);
   * const b = tf.tensor1d([2, 2, 2]);
   *
   * a.equal(b).print();
   * ```
   *
   * @param a The first input tensor.
   * @param b The second input tensor. Must have the same dtype as `a`.
   */
  @doc({heading: 'Operations', subheading: 'Logical'})
  @operation
  static equal<T extends Tensor>(a: Tensor|TensorLike, b: Tensor|TensorLike):
      T {
    const $a = convertToTensor(a, 'a', 'equal');
    const $b = convertToTensor(b, 'b', 'equal');
    assertTypesMatch($a, $b);
    assertAndGetBroadcastShape($a.shape, $b.shape);

    return ENV.engine.runKernel(backend => backend.equal($a, $b), {$a, $b}) as
        T;
  }

  @operation
  static equalStrict<T extends Tensor>(a: T|TensorLike, b: T|TensorLike): T {
    const $a = convertToTensor(a, 'a', 'equalStrict');
    const $b = convertToTensor(b, 'b', 'equalStrict');
    assertShapesMatch($a.shape, $b.shape, 'Error in equalStrict: ');
    return $a.equal($b);
  }

  /**
   * Returns the truth value of (a <= b) element-wise. Supports broadcasting.
   *
   * We also expose `lessEqualStrict` which has the same signature as this op
   * and asserts that `a` and `b` are the same shape (does not broadcast).
   *
   * ```js
   * const a = tf.tensor1d([1, 2, 3]);
   * const b = tf.tensor1d([2, 2, 2]);
   *
   * a.lessEqual(b).print();
   * ```
   *
   * @param a The first input tensor.
   * @param b The second input tensor. Must have the same dtype as `a`.
   */
  @doc({heading: 'Operations', subheading: 'Logical'})
  @operation
  static lessEqual<T extends Tensor>(
      a: Tensor|TensorLike, b: Tensor|TensorLike): T {
    const $a = convertToTensor(a, 'a', 'lessEqual');
    const $b = convertToTensor(b, 'b', 'lessEqual');
    assertTypesMatch($a, $b);
    assertAndGetBroadcastShape($a.shape, $b.shape);

    return ENV.engine.runKernel(
               backend => backend.lessEqual($a, $b), {$a, $b}) as T;
  }

  @operation
  static lessEqualStrict<T extends Tensor>(a: T|TensorLike, b: T|TensorLike):
      T {
    const $a = convertToTensor(a, 'a', 'lessEqualStrict');
    const $b = convertToTensor(b, 'b', 'lessEqualStrict');
    assertShapesMatch($a.shape, $b.shape, 'Error in lessEqualStrict: ');
    return $a.lessEqual($b);
  }

  /**
   * Returns the truth value of (a > b) element-wise. Supports broadcasting.
   *
   * We also expose `greaterStrict` which has the same signature as this
   * op and asserts that `a` and `b` are the same shape (does not broadcast).
   *
   * ```js
   * const a = tf.tensor1d([1, 2, 3]);
   * const b = tf.tensor1d([2, 2, 2]);
   *
   * a.greater(b).print();
   * ```
   *
   * @param a The first input tensor.
   * @param b The second input tensor. Must have the same dtype as `a`.
   */
  @doc({heading: 'Operations', subheading: 'Logical'})
  @operation
  static greater<T extends Tensor>(a: Tensor|TensorLike, b: Tensor|TensorLike):
      T {
    const $a = convertToTensor(a, 'a', 'greater');
    const $b = convertToTensor(b, 'b', 'greater');
    assertTypesMatch($a, $b);
    assertAndGetBroadcastShape($a.shape, $b.shape);

    return ENV.engine.runKernel(backend => backend.greater($a, $b), {$a, $b}) as
        T;
  }

  @operation
  static greaterStrict<T extends Tensor>(a: T|TensorLike, b: T|TensorLike): T {
    const $a = convertToTensor(a, 'a', 'greaterStrict');
    const $b = convertToTensor(b, 'b', 'greaterStrict');
    assertShapesMatch($a.shape, $b.shape, 'Error in greaterStrict: ');
    return $a.greater($b);
  }

  /**
   * Returns the truth value of (a >= b) element-wise. Supports broadcasting.
   *
   * We also expose `greaterEqualStrict` which has the same signature as this
   * op and asserts that `a` and `b` are the same shape (does not broadcast).
   *
   * ```js
   * const a = tf.tensor1d([1, 2, 3]);
   * const b = tf.tensor1d([2, 2, 2]);
   *
   * a.greaterEqual(b).print();
   * ```
   *
   * @param a The first input tensor.
   * @param b The second input tensor. Must have the same dtype as `a`.
   */
  @doc({heading: 'Operations', subheading: 'Logical'})
  @operation
  static greaterEqual<T extends Tensor>(
      a: Tensor|TensorLike, b: Tensor|TensorLike): T {
    const $a = convertToTensor(a, 'a', 'greaterEqual');
    const $b = convertToTensor(b, 'b', 'greaterEqual');
    assertTypesMatch($a, $b);
    assertAndGetBroadcastShape($a.shape, $b.shape);

    return ENV.engine.runKernel(
               backend => backend.greaterEqual($a, $b), {$a, $b}) as T;
  }

  @operation
  static greaterEqualStrict<T extends Tensor>(a: T|TensorLike, b: T|TensorLike):
      T {
    const $a = convertToTensor(a, 'a', 'greaterEqualStrict');
    const $b = convertToTensor(b, 'b', 'greaterEqualStrict');
    assertShapesMatch($a.shape, $b.shape, 'Error in greaterEqualStrict: ');
    return $a.greaterEqual($b);
  }
}
